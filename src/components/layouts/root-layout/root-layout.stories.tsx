import type { Component } from "solid-js"
import type { Meta, StoryObj } from "storybook-solidjs"

import { RootLayout } from "./root-layout"

const meta = {
  title: "layouts/RootLayout",
  component: RootLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof RootLayout>
export default meta

type Story = StoryObj<typeof meta>

const DefaultDemo: Component = () => {
  return (
    <>
      <h1 class="text-3xl font-bold">Hello, World!</h1>
      <p class="mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Morbi tincidunt
        augue interdum velit. Nisl purus in mollis nunc sed id semper. Urna
        neque viverra justo nec ultrices dui sapien. Hac habitasse platea
        dictumst quisque sagittis purus sit amet. Eget arcu dictum varius duis
        at consectetur lorem. Maecenas volutpat blandit aliquam etiam erat velit
        scelerisque in. Odio ut sem nulla pharetra diam. Enim neque volutpat ac
        tincidunt vitae semper quis. Volutpat consequat mauris nunc congue.
      </p>
    </>
  )
}

export const Default: Story = {
  args: {
    class: "container",
    children: () => <DefaultDemo />,
  },
}

const WithLongContentDemo: Component = () => {
  return (
    <>
      <h1 class="text-3xl font-bold">Hello, World!</h1>
      <p class="mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget
        nullam non nisi est sit amet. Vulputate enim nulla aliquet porttitor
        lacus luctus accumsan tortor. Morbi tristique senectus et netus. Egestas
        sed tempus urna et pharetra pharetra massa. Nascetur ridiculus mus
        mauris vitae ultricies. Purus sit amet luctus venenatis lectus magna
        fringilla urna porttitor. Pretium fusce id velit ut tortor pretium.
        Pretium lectus quam id leo in vitae turpis. Turpis in eu mi bibendum
        neque egestas congue. Porta lorem mollis aliquam ut porttitor leo a.
        Sodales ut etiam sit amet nisl purus in mollis nunc. Elementum nisi quis
        eleifend quam adipiscing. Aliquet sagittis id consectetur purus. Sit
        amet consectetur adipiscing elit ut aliquam.
      </p>
      <p class="mt-4">
        Ipsum nunc aliquet bibendum enim facilisis gravida. Tincidunt tortor
        aliquam nulla facilisi cras fermentum. In nibh mauris cursus mattis
        molestie a iaculis at. Nisl rhoncus mattis rhoncus urna neque viverra
        justo. A diam sollicitudin tempor id eu nisl nunc mi. Porttitor rhoncus
        dolor purus non enim praesent elementum. Metus aliquam eleifend mi in
        nulla. Ut eu sem integer vitae justo eget magna fermentum iaculis. Vel
        pretium lectus quam id leo in vitae turpis. Lacus luctus accumsan tortor
        posuere ac. Mi sit amet mauris commodo. Non sodales neque sodales ut.
        Eget nulla facilisi etiam dignissim diam. Laoreet suspendisse interdum
        consectetur libero id faucibus nisl tincidunt. Id leo in vitae turpis
        massa sed elementum. Dolor sit amet consectetur adipiscing. Amet est
        placerat in egestas erat.
      </p>
      <p class="mt-4">
        Laoreet id donec ultrices tincidunt arcu non. Vitae suscipit tellus
        mauris a diam maecenas sed. Magna fermentum iaculis eu non diam
        phasellus. Cursus mattis molestie a iaculis at erat pellentesque. Ornare
        lectus sit amet est placerat in egestas. Rutrum tellus pellentesque eu
        tincidunt tortor aliquam nulla facilisi. Cursus eget nunc scelerisque
        viverra mauris in aliquam sem. Massa massa ultricies mi quis hendrerit
        dolor magna. A erat nam at lectus urna. Aliquam vestibulum morbi blandit
        cursus risus at ultrices. Maecenas volutpat blandit aliquam etiam. Est
        pellentesque elit ullamcorper dignissim. Senectus et netus et malesuada
        fames ac turpis egestas. Risus in hendrerit gravida rutrum quisque non
        tellus orci. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus
        nullam. Tincidunt augue interdum velit euismod in pellentesque massa
        placerat duis.
      </p>
      <p class="mt-4">
        Eleifend donec pretium vulputate sapien nec. Vestibulum mattis
        ullamcorper velit sed ullamcorper morbi tincidunt ornare. Arcu vitae
        elementum curabitur vitae nunc sed velit dignissim sodales. Quis vel
        eros donec ac. Consectetur lorem donec massa sapien. Amet venenatis urna
        cursus eget nunc scelerisque viverra mauris in. Dignissim suspendisse in
        est ante in nibh mauris cursus. Lorem sed risus ultricies tristique.
        Amet risus nullam eget felis eget nunc lobortis mattis. Vitae congue eu
        consequat ac felis donec. Vivamus arcu felis bibendum ut tristique et
        egestas quis. Condimentum mattis pellentesque id nibh tortor id aliquet
        lectus proin.
      </p>
      <p class="mt-4">
        Euismod lacinia at quis risus sed vulputate odio ut. Nibh sed pulvinar
        proin gravida hendrerit lectus a. In nisl nisi scelerisque eu ultrices
        vitae auctor eu augue. Facilisis mauris sit amet massa vitae tortor. In
        hac habitasse platea dictumst vestibulum rhoncus est pellentesque.
        Mauris ultrices eros in cursus turpis massa tincidunt. Faucibus in
        ornare quam viverra. Tincidunt nunc pulvinar sapien et ligula
        ullamcorper malesuada. Lacinia at quis risus sed vulputate odio ut enim
        blandit. Lacus sed viverra tellus in hac. Viverra nam libero justo
        laoreet sit amet cursus. Scelerisque viverra mauris in aliquam sem
        fringilla. Cras fermentum odio eu feugiat pretium nibh ipsum consequat.
        Orci eu lobortis elementum nibh tellus molestie. Orci sagittis eu
        volutpat odio facilisis.
      </p>
      <p class="mt-4">
        Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi.
        Id donec ultrices tincidunt arcu non sodales. Purus sit amet luctus
        venenatis lectus magna fringilla. Imperdiet sed euismod nisi porta lorem
        mollis. Suscipit adipiscing bibendum est ultricies integer quis. Magna
        fermentum iaculis eu non diam phasellus vestibulum lorem. Sit amet
        volutpat consequat mauris nunc congue. Sed faucibus turpis in eu mi
        bibendum. Augue eget arcu dictum varius duis. Sed nisi lacus sed viverra
        tellus.
      </p>
      <p class="mt-4">
        Nisi est sit amet facilisis magna etiam tempor. Pretium nibh ipsum
        consequat nisl vel pretium lectus. Massa sapien faucibus et molestie ac.
        Justo donec enim diam vulputate ut pharetra sit. Habitasse platea
        dictumst vestibulum rhoncus. Turpis massa sed elementum tempus egestas
        sed sed. Sit amet porttitor eget dolor morbi. Ac orci phasellus egestas
        tellus. Suscipit tellus mauris a diam maecenas sed enim. Interdum velit
        laoreet id donec ultrices tincidunt arcu non sodales. Dolor sit amet
        consectetur adipiscing elit duis. Faucibus a pellentesque sit amet
        porttitor eget dolor morbi. Duis at tellus at urna condimentum mattis
        pellentesque id nibh.
      </p>
      <p class="mt-4">
        Praesent semper feugiat nibh sed. Et leo duis ut diam quam. Non blandit
        massa enim nec dui. Rutrum tellus pellentesque eu tincidunt. Vel
        pharetra vel turpis nunc eget lorem dolor sed viverra. Tellus rutrum
        tellus pellentesque eu tincidunt. Eu augue ut lectus arcu bibendum at
        varius. Pharetra massa massa ultricies mi quis hendrerit dolor magna. A
        lacus vestibulum sed arcu non. Dapibus ultrices in iaculis nunc sed.
        Tincidunt ornare massa eget egestas purus viverra accumsan in. Senectus
        et netus et malesuada fames ac turpis. Volutpat lacus laoreet non
        curabitur gravida arcu ac tortor. Aliquet eget sit amet tellus cras
        adipiscing enim eu turpis.
      </p>
      <p class="mt-4">
        In fermentum et sollicitudin ac orci phasellus. Odio ut sem nulla
        pharetra diam sit amet. Viverra accumsan in nisl nisi scelerisque eu
        ultrices vitae auctor. Eu sem integer vitae justo eget. Ac turpis
        egestas integer eget aliquet. Lectus magna fringilla urna porttitor
        rhoncus dolor. Quisque non tellus orci ac auctor augue mauris augue.
        Libero nunc consequat interdum varius sit amet. Maecenas accumsan lacus
        vel facilisis volutpat est. Iaculis eu non diam phasellus vestibulum
        lorem. Platea dictumst vestibulum rhoncus est pellentesque elit
        ullamcorper dignissim cras. Pulvinar sapien et ligula ullamcorper. Augue
        lacus viverra vitae congue eu consequat. Tortor condimentum lacinia quis
        vel eros donec ac odio. Est placerat in egestas erat imperdiet sed.
        Gravida arcu ac tortor dignissim convallis. Id diam maecenas ultricies
        mi eget. Placerat orci nulla pellentesque dignissim enim.
      </p>
      <p class="mt-4">
        Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum.
        Libero volutpat sed cras ornare arcu dui vivamus. Aliquam sem et tortor
        consequat. Dictum sit amet justo donec enim diam. Vel facilisis volutpat
        est velit egestas dui id ornare. Morbi tempus iaculis urna id volutpat
        lacus laoreet non. Blandit cursus risus at ultrices mi. Ipsum a arcu
        cursus vitae congue mauris rhoncus. Suspendisse ultrices gravida dictum
        fusce ut placerat. Netus et malesuada fames ac turpis egestas sed. Odio
        facilisis mauris sit amet. Eu volutpat odio facilisis mauris sit amet
        massa vitae tortor. Sed risus pretium quam vulputate dignissim
        suspendisse in. Nisl pretium fusce id velit ut tortor. Posuere lorem
        ipsum dolor sit amet consectetur adipiscing.
      </p>
      <p class="mt-4">
        Lacus viverra vitae congue eu consequat ac felis donec. Tristique magna
        sit amet purus gravida quis. In ornare quam viverra orci. Feugiat sed
        lectus vestibulum mattis ullamcorper velit. Mattis aliquam faucibus
        purus in massa tempor nec feugiat nisl. Aliquet bibendum enim facilisis
        gravida neque convallis a cras. Lorem sed risus ultricies tristique
        nulla aliquet enim tortor. Quis varius quam quisque id diam vel. Lectus
        magna fringilla urna porttitor rhoncus dolor purus. Faucibus turpis in
        eu mi bibendum neque egestas. Nec ullamcorper sit amet risus nullam eget
        felis. Tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Vel
        facilisis volutpat est velit egestas dui id ornare arcu. Curabitur
        gravida arcu ac tortor dignissim convallis. Luctus accumsan tortor
        posuere ac ut consequat semper viverra nam. Elementum nisi quis eleifend
        quam adipiscing. Cum sociis natoque penatibus et magnis dis parturient
        montes nascetur. Amet consectetur adipiscing elit duis tristique
        sollicitudin nibh sit. Dictum sit amet justo donec. Dui faucibus in
        ornare quam viverra orci sagittis eu volutpat.
      </p>
      <p class="mt-4">
        Laoreet id donec ultrices tincidunt arcu. Justo eget magna fermentum
        iaculis eu non diam phasellus vestibulum. Dictumst vestibulum rhoncus
        est pellentesque. Vitae et leo duis ut. Proin sagittis nisl rhoncus
        mattis rhoncus urna neque viverra. Ut lectus arcu bibendum at varius. Id
        porta nibh venenatis cras sed felis. Mauris pellentesque pulvinar
        pellentesque habitant morbi tristique senectus et netus. Egestas tellus
        rutrum tellus pellentesque eu tincidunt tortor aliquam. Purus sit amet
        luctus venenatis. Eu mi bibendum neque egestas congue quisque egestas.
        Eget duis at tellus at. Sed id semper risus in hendrerit gravida rutrum
        quisque non. Velit dignissim sodales ut eu sem integer. Ornare arcu odio
        ut sem nulla pharetra diam sit.
      </p>
      <p class="mt-4">
        Vel facilisis volutpat est velit egestas dui id ornare. Congue eu
        consequat ac felis donec et odio pellentesque diam. Lectus magna
        fringilla urna porttitor rhoncus dolor purus non enim. Ac tincidunt
        vitae semper quis lectus. Lectus sit amet est placerat in egestas erat
        imperdiet. In pellentesque massa placerat duis ultricies. Hendrerit
        gravida rutrum quisque non tellus orci. Sed elementum tempus egestas sed
        sed risus pretium. Diam sit amet nisl suscipit adipiscing. Amet aliquam
        id diam maecenas ultricies mi eget mauris pharetra. Tristique et egestas
        quis ipsum suspendisse ultrices gravida dictum fusce. Nisl suscipit
        adipiscing bibendum est. At risus viverra adipiscing at in tellus
        integer feugiat. Non tellus orci ac auctor augue mauris. Fermentum leo
        vel orci porta non. Elit duis tristique sollicitudin nibh sit amet. Eu
        mi bibendum neque egestas congue quisque egestas.
      </p>
      <p class="mt-4">
        Vulputate odio ut enim blandit volutpat. Pharetra magna ac placerat
        vestibulum lectus mauris. Ut etiam sit amet nisl purus. Aliquet bibendum
        enim facilisis gravida neque convallis a. Sit amet tellus cras
        adipiscing. Purus gravida quis blandit turpis cursus in hac habitasse
        platea. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar.
        Ipsum dolor sit amet consectetur. Viverra suspendisse potenti nullam ac
        tortor. Amet nulla facilisi morbi tempus. Facilisi nullam vehicula ipsum
        a arcu cursus vitae. Dignissim convallis aenean et tortor at risus.
        Natoque penatibus et magnis dis parturient montes nascetur. Sed enim ut
        sem viverra aliquet eget sit. Amet massa vitae tortor condimentum
        lacinia quis vel eros. Orci phasellus egestas tellus rutrum tellus
        pellentesque eu tincidunt tortor.
      </p>
      <p class="mt-4">
        Tempus imperdiet nulla malesuada pellentesque. Volutpat commodo sed
        egestas egestas fringilla phasellus faucibus. Sagittis vitae et leo
        duis. Euismod nisi porta lorem mollis aliquam ut porttitor. Id porta
        nibh venenatis cras sed felis. Porttitor lacus luctus accumsan tortor
        posuere ac ut. Euismod in pellentesque massa placerat duis ultricies
        lacus sed turpis. Rhoncus aenean vel elit scelerisque mauris
        pellentesque pulvinar pellentesque habitant. Sit amet volutpat consequat
        mauris nunc congue nisi vitae suscipit. Venenatis a condimentum vitae
        sapien. Volutpat ac tincidunt vitae semper quis lectus nulla at. Est
        placerat in egestas erat imperdiet sed euismod nisi. In mollis nunc sed
        id semper. Diam volutpat commodo sed egestas egestas fringilla phasellus
        faucibus scelerisque. Lorem dolor sed viverra ipsum. Nunc lobortis
        mattis aliquam faucibus purus in massa tempor. Donec enim diam vulputate
        ut pharetra sit. Id nibh tortor id aliquet lectus proin. Tincidunt arcu
        non sodales neque sodales ut etiam sit amet.
      </p>
      <p class="mt-4">
        Etiam erat velit scelerisque in dictum non. Nunc scelerisque viverra
        mauris in aliquam sem. Pellentesque id nibh tortor id aliquet lectus.
        Fermentum odio eu feugiat pretium nibh ipsum. Elementum sagittis vitae
        et leo. Phasellus faucibus scelerisque eleifend donec. Leo vel orci
        porta non pulvinar. Vestibulum lorem sed risus ultricies tristique nulla
        aliquet. Lobortis scelerisque fermentum dui faucibus in. Nunc mattis
        enim ut tellus elementum sagittis vitae. Venenatis lectus magna
        fringilla urna porttitor rhoncus dolor purus non. Sagittis vitae et leo
        duis ut diam quam nulla porttitor. Vitae turpis massa sed elementum.
        Arcu cursus vitae congue mauris rhoncus aenean vel elit. Praesent
        tristique magna sit amet purus gravida. Tellus orci ac auctor augue
        mauris augue neque gravida in. Commodo nulla facilisi nullam vehicula
        ipsum a arcu cursus. Odio ut enim blandit volutpat maecenas volutpat
        blandit. Platea dictumst quisque sagittis purus sit amet volutpat
        consequat mauris. Enim diam vulputate ut pharetra sit amet aliquam id.
      </p>
      <p class="mt-4">
        Et odio pellentesque diam volutpat commodo sed egestas egestas. Vitae
        purus faucibus ornare suspendisse sed nisi lacus. Feugiat nisl pretium
        fusce id velit ut. Diam maecenas ultricies mi eget mauris pharetra et.
        In metus vulputate eu scelerisque felis imperdiet. Blandit turpis cursus
        in hac habitasse platea dictumst. At erat pellentesque adipiscing
        commodo elit. Diam vulputate ut pharetra sit. Diam sit amet nisl
        suscipit adipiscing bibendum. Gravida neque convallis a cras semper
        auctor neque vitae. Elementum sagittis vitae et leo duis ut diam quam
        nulla. Consectetur a erat nam at lectus urna.
      </p>
      <p class="mt-4">
        Scelerisque varius morbi enim nunc faucibus a pellentesque. Ultricies mi
        eget mauris pharetra et ultrices neque ornare. Turpis egestas maecenas
        pharetra convallis. Faucibus scelerisque eleifend donec pretium.
        Tincidunt id aliquet risus feugiat in ante metus dictum at. Enim eu
        turpis egestas pretium aenean pharetra. Aliquam ultrices sagittis orci a
        scelerisque. Eget arcu dictum varius duis. Integer feugiat scelerisque
        varius morbi enim nunc. Augue eget arcu dictum varius duis at
        consectetur. Id diam maecenas ultricies mi eget mauris pharetra. Commodo
        elit at imperdiet dui accumsan. Arcu felis bibendum ut tristique et.
      </p>
      <p class="mt-4">
        In hac habitasse platea dictumst quisque sagittis purus sit amet. Turpis
        cursus in hac habitasse platea dictumst quisque. Ipsum suspendisse
        ultrices gravida dictum. Lobortis mattis aliquam faucibus purus in
        massa. Mauris vitae ultricies leo integer malesuada nunc. Commodo sed
        egestas egestas fringilla phasellus faucibus scelerisque eleifend. Id
        interdum velit laoreet id donec ultrices tincidunt. Eu turpis egestas
        pretium aenean pharetra magna. Pharetra massa massa ultricies mi quis.
        Morbi non arcu risus quis varius quam quisque id.
      </p>
      <p class="mt-4">
        Vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Commodo elit
        at imperdiet dui accumsan sit. Viverra accumsan in nisl nisi
        scelerisque. Mi in nulla posuere sollicitudin aliquam ultrices sagittis
        orci a. Ut sem viverra aliquet eget. Ac tincidunt vitae semper quis.
        Adipiscing elit pellentesque habitant morbi tristique senectus et.
        Vulputate enim nulla aliquet porttitor. Lorem ipsum dolor sit amet
        consectetur adipiscing. Pulvinar elementum integer enim neque volutpat
        ac tincidunt. Nunc non blandit massa enim nec. Sapien et ligula
        ullamcorper malesuada proin libero nunc consequat. Vel pretium lectus
        quam id leo. Sem et tortor consequat id porta nibh venenatis cras sed.
        Faucibus nisl tincidunt eget nullam non. Eros donec ac odio tempor orci
        dapibus ultrices.
      </p>
      <p class="mt-4">
        Risus in hendrerit gravida rutrum. Justo donec enim diam vulputate ut
        pharetra. Ut tellus elementum sagittis vitae et leo duis. Aliquam sem et
        tortor consequat id porta nibh venenatis. Viverra suspendisse potenti
        nullam ac tortor vitae purus. Tellus integer feugiat scelerisque varius
        morbi enim. In nibh mauris cursus mattis. Sed elementum tempus egestas
        sed sed risus pretium quam vulputate. Ultricies lacus sed turpis
        tincidunt id aliquet. Ultricies mi quis hendrerit dolor magna eget est.
        Eu ultrices vitae auctor eu augue ut lectus arcu. Est ultricies integer
        quis auctor elit. Aliquet sagittis id consectetur purus.
      </p>
      <p class="mt-4">
        Vel turpis nunc eget lorem. Ac placerat vestibulum lectus mauris
        ultrices eros in cursus turpis. Maecenas sed enim ut sem viverra aliquet
        eget. Nulla aliquet porttitor lacus luctus accumsan tortor posuere.
        Tortor pretium viverra suspendisse potenti. Tellus orci ac auctor augue
        mauris. Cursus in hac habitasse platea dictumst quisque sagittis.
        Suspendisse sed nisi lacus sed viverra tellus in. Ut morbi tincidunt
        augue interdum velit euismod in pellentesque. Luctus venenatis lectus
        magna fringilla urna porttitor rhoncus. Fames ac turpis egestas sed.
        Donec et odio pellentesque diam volutpat commodo. Egestas erat imperdiet
        sed euismod nisi porta lorem mollis aliquam. Mattis enim ut tellus
        elementum sagittis vitae et leo. Scelerisque in dictum non consectetur a
        erat nam at. Donec ac odio tempor orci dapibus ultrices in iaculis nunc.
        Velit aliquet sagittis id consectetur purus ut. Pellentesque nec nam
        aliquam sem.
      </p>
      <p class="mt-4">
        Quis eleifend quam adipiscing vitae. Dictum at tempor commodo
        ullamcorper. Gravida quis blandit turpis cursus in. Lorem ipsum dolor
        sit amet. Scelerisque eleifend donec pretium vulputate sapien. Non diam
        phasellus vestibulum lorem sed risus. Arcu odio ut sem nulla pharetra
        diam sit amet nisl. Sed risus ultricies tristique nulla aliquet enim
        tortor at auctor. Mattis molestie a iaculis at erat. Mauris in aliquam
        sem fringilla ut. Congue nisi vitae suscipit tellus mauris a diam
        maecenas sed. Duis convallis convallis tellus id interdum velit laoreet
        id. Elit pellentesque habitant morbi tristique senectus et. Accumsan
        tortor posuere ac ut consequat semper. Id diam maecenas ultricies mi.
        Sapien eget mi proin sed libero. Quis ipsum suspendisse ultrices
        gravida. A cras semper auctor neque vitae tempus quam pellentesque nec.
      </p>
      <p class="mt-4">
        Enim sit amet venenatis urna. Lobortis scelerisque fermentum dui
        faucibus in ornare. Nunc sed augue lacus viverra vitae congue eu
        consequat ac. Mauris nunc congue nisi vitae suscipit tellus mauris a.
        Non curabitur gravida arcu ac tortor dignissim convallis aenean et. Diam
        volutpat commodo sed egestas. Fermentum leo vel orci porta non pulvinar
        neque laoreet. Malesuada proin libero nunc consequat. Nisi quis eleifend
        quam adipiscing. Odio morbi quis commodo odio aenean sed adipiscing diam
        donec. Lorem mollis aliquam ut porttitor leo a. Elementum curabitur
        vitae nunc sed velit dignissim sodales. Faucibus et molestie ac feugiat
        sed lectus vestibulum mattis ullamcorper.
      </p>
    </>
  )
}

export const WithLongContent: Story = {
  args: {
    class: "container max-w-screen-md",
    children: () => <WithLongContentDemo />,
  },
}
